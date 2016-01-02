using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Act.Framework;

namespace ContactAdder.Models
{
    interface Act_DatabaseInterface : RelationalDatabaseInterface
    {      
        //includes these from RelationalDatabaseInterface (don't implement here!!)
        /*
        void CreateConnection();
        void AddPerson();
        void GetPerson();
        void UpdatePerson();
        void AddOrganization();
         */

        //Act DB Interface specific properties and methods
        //Act uses "Contact" and "Company" for "Person" and "Organization"
    }
}
