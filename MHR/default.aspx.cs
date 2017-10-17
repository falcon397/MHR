﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.Web.Services; //For WebMethod decorator.

namespace MHR
{
    public partial class Index : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        //Listening web method
        [WebMethod]
        public static string GetData(FileUpload csvData)
        {
            if (csvData.HasFile)
            {
                return "success";
            }

            return "failure";
        }
    }
}