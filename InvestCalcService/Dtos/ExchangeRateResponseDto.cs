using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestCalcService.Dtos
{
    public class ExchangeRateResponseDto
    {
        [JsonProperty("conversion_rate")]
        public decimal ConversionRate { get; set; }


        [JsonProperty("result")]
        public string Result { get; set; }
    }
}
