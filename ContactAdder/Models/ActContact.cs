using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Act.Framework;
using Act.Framework.Contacts;
using Act.Shared.Collections;

namespace ContactAdder.Models
{
    public class ActContact : Person
    {
        //inherited from Person
       // public string FirstName { get; set; }
        //public string LastName { get; set; }

        public string ContactName { get; set; }
        public string PersonalEmail { get; set; }
        public string BusinessEmail { get; set; }
        public string Company { get; set; }
        public string JobTitle { get; set; }
        public string Department { get; set; }
        public string ReferredBy { get; set; }
        public string LinkedInURL { get; set; }
        public string ActLogin { get; set; }
        public string ActPassword { get; set; }
        public string ActDatabase { get; set; }
        public string ImageURL { get; set; }

    }
}