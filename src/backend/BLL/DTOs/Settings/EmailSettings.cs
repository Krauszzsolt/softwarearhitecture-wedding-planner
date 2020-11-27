﻿using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DTOs.Settings
{
    public class EmailSettings
    {
        public bool IsDevelopment { get; set; }
        public bool UseSsl { get; set; }
        public string MailServer { get; set; }
        public int MailPort { get; set; }
        public string SenderEmail { get; set; }
        public string SenderName { get; set; }
        public string Password { get; set; }
    }

}
