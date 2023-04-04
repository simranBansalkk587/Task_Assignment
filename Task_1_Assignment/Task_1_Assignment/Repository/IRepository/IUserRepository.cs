using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Task_1_Assignment.Models;

namespace Task_1_Assignment.Repository.IRepository
{
  public  interface IUserRepository
  {
    bool IsUniqueUser(string username);
    User Authenticate(string username, string password);
    User Register(string username, string password);
  }
}
