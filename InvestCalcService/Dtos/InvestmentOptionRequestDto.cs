using System;
using System.Collections.Generic;
using InvestmentCalcService.Dtos.Common;
namespace InvestmentCalcService.Dtos
{
    public class InvestmentOptionRequestDto
    {
        public decimal InvestmentAmount { get; set; }

        public List<InvestmentOptionDtoItem> InvestmentOptions {get; set;}

       
    }
}
