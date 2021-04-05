using InvestCalcService.Dtos.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestCalcService.Services
{
    public class CachedExchangeRateService : IExchangeRateService
    {
        private readonly ExchangeRateService exchangeRateService;
        private readonly ICacheProvider cacheProvider;
        private static readonly string CacheKeyBase = "ExchangeRate";
        public CachedExchangeRateService(ExchangeRateService exchangeRateService, ICacheProvider cacheProvider)
        {
            this.exchangeRateService = exchangeRateService;
            this.cacheProvider = cacheProvider;
        }
        public async Task<decimal> GetExchangeRate(CurrencyEnum from, CurrencyEnum to)
        {
            var cacheKey = $"{CacheKeyBase}::GetExchangeRate::{from.ToString()}::{to.ToString()}";
            return await this.GetCachedResponse(cacheKey, () => this.exchangeRateService.GetExchangeRate(from, to));
        }

        private async Task<decimal> GetCachedResponse(string cacheKey, Func<Task<decimal>> func)
        {
            var exchangeRate = this.cacheProvider.GetFromCache<object>(cacheKey);
            if (exchangeRate != null) return (decimal)exchangeRate;
            var freshExchangeRate = await func();
            this.cacheProvider.SetCache(cacheKey, freshExchangeRate as object, DateTimeOffset.Now.AddDays(1));

            return freshExchangeRate;
        }

    }
}
