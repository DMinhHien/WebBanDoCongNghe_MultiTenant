using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebBanDoCongNghe.DBContext;
using Newtonsoft.Json;
using WebBanDoCongNghe.Models;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using WebBanDoCongNghe.DTO;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WebBanDoCongNghe.Interface;
using System.Data;

namespace WebBanDoCongNghe.Controllers
{
    [ApiController]
    [Route("[controller]")]
    
    public class UserController : Controller
    {
        private readonly ProductDbContext _context;
        private readonly UserManager<UserManage> _userManager;
        private readonly SignInManager<UserManage> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenService _tokenService;
        // GET: ProductController
        public UserController(ProductDbContext context, UserManager<UserManage> userManager,
            SignInManager<UserManage> signInManager, ITokenService tokenService, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _context = context;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _roleManager = roleManager;
        }

        // POST: ProductController/Create
        [Authorize]
        [HttpPost("addRole")]
        public async Task<IActionResult> AddRole([FromBody] JObject json)
        {
            var userId = json.GetValue("userId")?.ToString();
            var roleName = json.GetValue("roleName")?.ToString();

            if (userId == null || roleName == null)
                return BadRequest("User ID or role name is missing.");

            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
                return NotFound("User not found.");

            if (!await _roleManager.RoleExistsAsync(roleName))
                return NotFound("Role not found.");

            var result = await _userManager.AddToRoleAsync(user, roleName);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Json(user);
        }
        [Authorize(Roles = "Admin")]
        [HttpPost("updateRole")]
        public async Task<IActionResult> UpdateRole([FromBody] JObject json)
        {
            // Tìm user dựa trên ID
            var userId = json.GetValue("userId")?.ToString();
            var newRole = json.GetValue("roleName")?.ToString();
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found");
            }

            // Lấy tất cả các role hiện tại của user
            var currentRoles = await _userManager.GetRolesAsync(user);

            // Xóa tất cả role hiện tại của user
            var removeResult = await _userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
            {
                return BadRequest("Failed to remove existing roles");
            }

            // Thêm role mới
            var addResult = await _userManager.AddToRoleAsync(user, newRole);
            if (!addResult.Succeeded)
            {
                return BadRequest(addResult.Errors);
            }

            return Json(user);
        }
        
        [HttpGet("getListUse")]
        public async Task<IActionResult> getListUse()
        {
            var users = _context.Users.ToList(); // Lấy tất cả người dùng
            var result = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user); // Lấy vai trò
                result.Add(new
                {
                    id = user.Id,
                    name = user.UserName,
                    email= user.Email,
                    birthdate=user.birthDate,
                    address=user.Address,
                    accountname=user.AccountName,
                    phone=user.PhoneNumber,

                    role = roles.Any() ? roles : new List<string>() // Trả về danh sách rỗng nếu không có vai trò
                });
            }

            return Json(result);
        }
        [Authorize]
        [HttpGet("checkLogin")]
        public IActionResult checkLogin()
        {
            var result = User.Identity.IsAuthenticated;
            return Json(result);
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> logout()
        {
            await _signInManager.SignOutAsync();
            return Json("Logout successfully");
        }
        [HttpGet("getElementById/{id}")]
        public IActionResult getElementById([FromRoute] string id)
        {
            var model = _context.Users.AsQueryable().Where(m => m.Id == id).
                Select(d=>new
                {
                    d.Id,
                    d.AccountName,
                    d.Email,
                    d.birthDate,
                    d.Address,
                    d.PhoneNumber

                });
            if (model == null)
            {
                return NotFound();
            }
            return Json(model);
        }
        [HttpGet("getElement")]
        public IActionResult getElement()
        {
            string userId = _userManager.GetUserId(HttpContext.User);
            var model = _context.Users.AsQueryable().Where(m => m.Id == userId)
                .Select(d => new
                {
                    d.Id,
                    d.AccountName,
                    d.Email,
                    d.birthDate,
                    d.Address,
                    d.PhoneNumber
                }) ; 
            if (model == null)
            {
                return NotFound();
            }
            return Json(model);
        }
        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterDTO model)
        {
            if (ModelState.IsValid)
            {
                var user = new UserManage
                {
                    UserName = model.Email,  
                    Email = model.Email,
                    AccountName = model.AccountName,
                    birthDate=model.BirthDate,
                    Address = model.Address,
                    PhoneNumber=model.Phone

                };

                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    var response = new
                    {
                        Token = _tokenService.CreateToken(user),
                        User = new
                        {
                            user.UserName,
                            user.Email,
                            user.Id,
                            user.AccountName,
                            model.Phone,
                            model.BirthDate,
                            model.Address,
                        }  
                };
                    return Ok(response);
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError(string.Empty, error.Description);
                }
            }

            return BadRequest(ModelState);
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginDTO model)
        {
            if (ModelState.IsValid)
            {
                // Tìm người dùng qua AccountName hoặc Email
                var user = await _userManager.FindByEmailAsync(model.Email);
                if (user == null)
                {
                    user = await _userManager.Users
                        .FirstOrDefaultAsync(u => u.AccountName == model.Email);
                }

                if (user != null)
                {
                    var result = await _signInManager.PasswordSignInAsync(user.UserName, model.Password, isPersistent: false, lockoutOnFailure: false);
                    if (result.Succeeded)
                    {
                        var userRole = await _userManager.GetRolesAsync(user);
                        var response = new
                        {
                            Token = _tokenService.CreateToken(user,userRole),
                            User = new
                            {
                                user.UserName,
                                user.Email,
                                user.Id,
                                user.AccountName,
                                user.birthDate,
                                user.Address,
                                user.PhoneNumber,
                                role = userRole.FirstOrDefault()
                            }
                        };

                        return Ok(response);
                    }
                    else
                    {
                        return Unauthorized("Mật khẩu không đúng.");
                    }
                }

                return NotFound("Người dùng không tồn tại.");
            }

            return BadRequest(ModelState);
        }
        [Authorize]
        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete([FromRoute] string id)
        {
            // Tìm user theo ID
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Xóa user
            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to delete user", errors = result.Errors });
            }

            return Ok(new { message = "User deleted successfully" });
        }
        [Authorize]
        [HttpPut("EditUser")]
        public async Task<IActionResult> EditUser([FromBody] JObject json)
        {
            // Tìm user theo ID
            var model = JsonConvert.DeserializeObject<UserManage>(json.GetValue("data").ToString());
            var id = model.Id;
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Cập nhật thông tin
            user.UserName = model.UserName ?? user.UserName;
            user.Email = model.Email ?? user.Email;
            user.AccountName = model.AccountName ?? user.AccountName;
            user.Address = model.Address ?? user.Address;
            user.birthDate = model.birthDate ?? user.birthDate;
            user.PhoneNumber = model.PhoneNumber ?? user.PhoneNumber;
            // Lưu thay đổi
            var result = await _userManager.UpdateAsync(user);
            if (!result.Succeeded)
            {
                return BadRequest(new { message = "Failed to update user", errors = result.Errors });
            }

            return Ok(new { message = "User updated successfully", user });
        }
    }
}
