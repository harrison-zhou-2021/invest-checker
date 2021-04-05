using InvestCalcService.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestCalcService.Services
{
    public interface IExchangeRateService
    {
        Task<decimal> GetExchangeRate(CurrencyEnum from, CurrencyEnum to);
    }
}
