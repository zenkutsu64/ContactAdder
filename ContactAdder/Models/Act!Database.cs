using System;
using System.Collections;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Web;
using System.Net; 
using System.Reflection; //Act! throws an error that needs this
using Act.Framework;
using Act.Framework.Contacts;
using Act.Framework.MetaData; 
using Act.Shared.Collections;
using Act.Framework.MutableEntities; //This has Contact Accessors


namespace ContactAdder.Models
{
    public class Act_Database : RelationalDatabase, Act_DatabaseInterface
    {
        //Inherited from RelationalDatabase
        //public string DatabaseType { get; set; } //MySQL, SQLite, MS SQL Server, Act!, etc...
        //public string LoginPath { get; set; }

        //Must-implements for Act_DatabaseInterface
        //NOTE: *******************loginpath and image path MUST be compatible with each other ***************************************
        //public void CreateConnection(string login, string password) //todo: add argument for database 
        public void CreateConnection(string login, string password, string database)
        {
            DatabaseType = ("Act!");
            //LoginPath = "C:\\Users\\Scott\\Documents\\ACT\\ACT Data\\Databases\\ScottyPPv16Web3.pad";
            //LoginPath = "C:\\Users\\Scott\\Documents\\ACT\\ACT Data\\Databases\\OptomiLADellv2.pad"; //Dell laptop remote DB
            //LoginPath = "C:\\Users\\zenkutsu64\\My Documents\\ACT\\ACT Data\\Databases\\PivotPointWebv16.pad"; //jamporium.com (Rackspace)
            //LoginPath = "C:\\Users\\zenkutsu64\\Documents\\ACT\\ACT Data\\Databases\\OptomiLA.pad"; //bizexpedite.com (Azure)
           
            if (database == "PPSearch")
                LoginPath = "C:\\Users\\Scott\\Documents\\ACT\\ACT Data\\Databases\\ScottPivotPoint2point0.pad"; //todo: conditional to select login path
            else if (database == "PPTalent")
                LoginPath = "C:\\Users\\Scott\\Documents\\ACT\\ACT Data\\Databases\\ScottPivotPointTalent.pad";
            else if (database == "GladPixGarden")
                LoginPath = "C:\\Users\\Scott\\Documents\\ACT\\ACT Data\\Databases\\ScottGladPixGarden.pad"; //todo: conditional to select login path
           
            //LoginPath = "C:\\Users\\zenkutsu64\\Documents\\ACT\\ACT Data\\Databases\\PivotPoint2point0.pad"; //bizexpedite.com (Azure)
            theFramework = new ActFramework();
            try { 
                theFramework.LogOn(LoginPath, login, password);
                //Test block here to investigate details of the db
                SchemaMetaData smd = theFramework.SchemaMetaData;
                ReadOnlyHashtable tblByName = smd.TableByName;
                ArrayList customFieldArray = new ArrayList();
                ContactFieldDescriptor[] cfdList = theFramework.Contacts.GetContactFieldDescriptors(); //inspect cfdList in the debugger to get info
            }
            catch (InvalidLogonException e){
                Console.WriteLine(e.Message);
            }
            catch (TargetInvocationException e)
            {
                Console.WriteLine(e.Message);
            }
            catch (PADObjectException e)
            {
                Console.WriteLine(e.Message);
            }


        }

        //TODO Override inherited AddPerson() to use one ActContact parameter
        public void AddPerson() 
        {             
        }
        public void GetPerson() { }
        public void UpdatePerson() { }
        public void AddOrganization() { }
        
        //Properties and methods of this class thru to the bottom
        private ActFramework theFramework;
        public void AddContact(ActContact contact)
        {
            Contact newcontact;

            //CreateConnection(contact.ActLogin, contact.ActPassword); //TODO: add argument for database, get it from new contact field "PivotPoint" or "Jamporium"
            CreateConnection(contact.ActLogin, contact.ActPassword, contact.ActDatabase); //this is new
           
      
            try {
           
                 newcontact = theFramework.Contacts.CreateContact();
        
                
                if (contact.ImageURL != "placeholder.jpg")
                {
                    ContactFieldDescriptor imageCFD = theFramework.Contacts.GetContactFieldDescriptor("Contact.Picture", false); //the field is named "Picture"
                    WebClient LinkedIn = new WebClient();
                    //String FileName = "C:\\Users\\Scott\\Documents\\ACT\\ACT Data\\Databases\\LastLinkedInPic.jpg"; //this should work on Scobe2013
                    String FileName = "C:\\LastLinkedInPic.jpg"; //this works on central server
                    Uri LIPic = new Uri(contact.ImageURL);
                    LinkedIn.DownloadFile(LIPic, FileName);
                    Image newimage = Image.FromFile(FileName); //ImageURL sent from Chrome Extension, this line breaks app
                    imageCFD.SetValue(newcontact, newimage);
                }
            //todo: add section--if database is PP, create contact with limited access to the "Trusted" team

              /* Debugging stuff
              Contact myrecord;
              myrecord = theFramework.Contacts.GetMyRecord();
              */
          
              newcontact.FullName = contact.ContactName;
              newcontact.Company = contact.Company;
              newcontact.Fields["TBL_CONTACT.PERSONAL_EMAIL", true] = contact.PersonalEmail;
              newcontact.Fields["TBL_CONTACT.ST-BIZEMAIL_ADDRESS", true] = contact.BusinessEmail; 
              newcontact.Fields["TBL_CONTACT.CUST_LILink_034839413", true] = contact.LinkedInURL; 
              newcontact.Fields["TBL_CONTACT.JOBTITLE", true] = contact.JobTitle;
              newcontact.Fields["TBL_CONTACT.DEPARTMENT", true] = contact.Department; 
              newcontact.Fields["TBL_CONTACT.REFERREDBY", true] = contact.ReferredBy;

             // if (database == "PPSearch")
              if (true)
              {
                
                // ARRAY TO HOLD NEW ACCESS LIST, AND ALSO GET ALL AVAILABLE ACCESSORS
                Accessor[] NewAccessList = new Accessor[1];
                Accessor[] AllAccessors = theFramework.Contacts.GetAccessors();
	            
               // LOOP THROUGH THE ACCESSOR LIST TO FIND WHAT YOU WANT BY NAME (TEAMS AND USERS ARE IN HERE)
                int count = 0;
                foreach(Accessor ac in AllAccessors)
                {
                    if(ac.Name == "Trusted")
                    {
                        NewAccessList[count] = ac;
                        count += 1;
                    }
                } //end foreach
	            
                // UPDATE THE CONTACT WITH THE NEW ACCESS LIST
                newcontact.Update();
                if (count == 1)
                    theFramework.Contacts.SetAccessors(newcontact, NewAccessList);

               } //end if (database...)

     
           
            } //end try...

           

            catch (NotLoggedOnException e) 
            { 
                Console.WriteLine(e.Message); 
            }

        }
      
        public Act_Database() //constructor
         {
             /*
            try
             {
                 CreateConnection(); //attach to the DB
             }
             finally { }
            */
         }

        ~Act_Database() {
            DestroyConnection();
        }
        
        public void DestroyConnection() {
            theFramework.LogOff();
        }


    } //close Act_Database


}//Close namespace