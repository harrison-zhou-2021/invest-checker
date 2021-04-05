using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestCalcService.Dtos
{
    public class InvestmentCalcResponseDto
    {
        public decimal ProjectedReturnInAud { get; set; }

        public decimal TotalFeesInAud { get; set; }

        public decimal TotalFeesInUsd { get; set; }
    }
}
