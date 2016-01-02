using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using ContactAdder.Models;

namespace ContactAdder.Controllers
{
    public class ContactsController : ApiController
    {
        Person[] people = 
        { 
            new Person { FirstName = "&n*3n9", LastName = "&N3m3"} //data used to test basic connectivity to a client
            //new Person { FirstName = "Scott", LastName = "Thompson"} //data used to test basic connectivity to a client
        };

        // GET api/contacts
        public IEnumerable<Person> GetAllContacts()
        {
            return people;
        }
        
        //GET api/contacts
        /*
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }
         */
        

        // GET api/contacts/5
        public string Get(int id)
        {
            return "value";
        }


        public void PostContact(ActContact actcontact)
        {
            
            try
            {
                Act_Database adb = new Act_Database();
                adb.AddContact(actcontact);
                adb.DestroyConnection();
                //hopefully as adb goes out of scope here, it is completely destroyed. At least for now
            }
            finally { }
        }
        
        /*
        POST api/contacts
        public void Post([FromBody]string value)
        {
        }
         */

        // PUT api/contacts/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/contacts/5
        public void Delete(int id)
        {
        }
    }
}
