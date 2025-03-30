using WebBanDoCongNghe.Models;

namespace WebBanDoCongNghe.Interface
{
    public interface ITokenService
    {
        string CreateToken(UserManage User, IList<string> userRole);
        string CreateToken(UserManage User);
    }
}
