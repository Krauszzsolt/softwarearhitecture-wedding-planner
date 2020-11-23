using System;
using System.ComponentModel.DataAnnotations;

namespace BLL.DTOs
{
    public class NewWeddingDto
    {
        public string Name { get; set; }

        [Required]
        public string BethrothedOne { get; set; }

        [Required]
        public string BethrothedTwo { get; set; }

        [Required]
        public DateTime Date { get; set; }
    }
}
