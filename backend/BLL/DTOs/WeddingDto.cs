using DAL.Entities;
using System;

namespace BLL.DTOs
{
    public class WeddingDto
    {
        public WeddingDto()
        {

        }

        public WeddingDto(Wedding _wedding)
        {
            Id = _wedding.Id;
            UserId = _wedding.UserId;
            Name = _wedding.Name;
            BethrothedOne = _wedding.BethrothedOne;
            BethrothedTwo = _wedding.BethrothedTwo;
            Date = _wedding.Date;
        }

        public long Id { get; set; }

        public string UserId { get; set; }

        public string Name { get; set; }

        public string BethrothedOne { get; set; }

        public string BethrothedTwo { get; set; }

        public DateTime Date { get; set; }
    }
}
