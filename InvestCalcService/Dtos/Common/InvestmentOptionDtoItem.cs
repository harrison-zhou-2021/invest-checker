
using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json.Converters;

namespace InvestmentCalcService.Dtos.Common
{
    public class InvestmentOptionDtoItem {
      [JsonConverter(typeof(StringEnumConverter))]
      public InvestmentOptionEnum Option { get; set; }
      public int Percentage{ get; set;}
    }

}