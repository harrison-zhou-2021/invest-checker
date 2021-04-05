using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestCalcService.Dtos.Common
{
    public class RoiFeeResult
    {
        public decimal Roi { get; set; }
        public decimal Fee { get; set; } = 0;
    }
}
