using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ContactAdder.Models
{
    interface RelationalDatabaseInterface
    {
        //void CreateConnection(string login, string password);
        void CreateConnection(string login, string password, string database);
        void GetPerson();
        void AddPerson();
        void UpdatePerson();
        void AddOrganization();
    }
}
