using InvestCalcService.Dtos.Common;
using InvestmentCalcService.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestCalcService.Services
{
    public class InvestmentOptionCalcService : IInvestmentOptionCalcService
    {
        private static Func<decimal, decimal, decimal, decimal, RoiFeeResult> flatRate = (decimal amount, decimal percentage, decimal flatRate, decimal feeOverRoi) =>
       {
           var roi = amount * percentage * flatRate / 10000m;
           return new RoiFeeResult()
           {
               Roi = roi,
               Fee = roi * feeOverRoi / 100,
           };
       };

        private static readonly Dictionary<InvestmentOptionEnum, Func<decimal, decimal, RoiFeeResult>> CalcRules = new Dictionary<InvestmentOptionEnum, Func<decimal, decimal, RoiFeeResult>>()
        {
            [InvestmentOptionEnum.CASH_INVESTMENTS] = (decimal amount, decimal percentage) =>
            {
                var result = new RoiFeeResult();
                if (percentage <= 50)
                {
                    result.Roi = amount * percentage * 8.5m / 10000;
                    result.Fee = result.Roi * 0.005m;
                }
                else
                {
                    result.Roi = amount * percentage * 10m / 10000;
                    result.Fee = 0.0m;
                }
                return result;
            },

            [InvestmentOptionEnum.FIXED_INTEREST] = (decimal amount, decimal percentage) => flatRate(amount, percentage, 10m, 1m),
            
            [InvestmentOptionEnum.SHARES] = (decimal amount, decimal percentage) =>
            {
                decimal roi;
                if (percentage <= 70m)
                {
                    roi = amount * percentage * 4.3m / 10000m;
                }
                else
                {
                    roi = amount * percentage * 6m / 10000m;
                }

                return new RoiFeeResult()
                {
                    Roi = roi,
                    Fee = roi * 2.5m / 100
                };
            },
            [InvestmentOptionEnum.MANAGED_FUNDS] = (decimal amount, decimal percentage) =>
            {
                var roi = amount * percentage * 12.0m / 10000m;
                return new RoiFeeResult()
                {
                    Roi = roi,
                    Fee = roi * .3m / 100,
                };
            },
            [InvestmentOptionEnum.ETF] = (decimal amount, decimal percentage) => flatRate(amount, percentage, 12.8m, 2m),
            [InvestmentOptionEnum.INVESTMENT_BONDS] = (decimal amount, decimal percentage) =>flatRate(amount, percentage, 8m, .9m),
            [InvestmentOptionEnum.ANNUITIES] = (decimal amount, decimal percentage) => flatRate(amount, percentage, 4m, 1.4m),
            [InvestmentOptionEnum.LICs] = (decimal amount, decimal percentage) => flatRate(amount, percentage, 6m, 1.3m),
            [InvestmentOptionEnum.REITs] = (decimal amount, decimal percentage) => flatRate(amount, percentage, 4m, 2m)

        };
        public RoiFeeResult getRoiFee(decimal investmentAmount, List<InvestmentOptionDtoItem> options)
        {
            var results = options.AsParallel().Select(opt => CalcRules[opt.Option](investmentAmount, opt.Percentage));

            return new RoiFeeResult()
            {
                Roi = results.Sum(r => r.Roi),
                Fee = results.Sum(r => r.Fee),
            };
        }
    }
}
