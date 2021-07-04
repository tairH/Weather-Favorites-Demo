using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace WeatherFavorites.Api.Services
{
    public interface IHttpClientService
    {
        Task<T> Get<T>(string baseAddress, string apiRelativeUrl, string parm = null);
        Task<T> Post<T>(string baseAddress, string apiRelativeUrl, object data, string parm = null);
        Task<T> Get<T>(string baseAddress, string apiRelativeUrl, Dictionary<string, string> parms);
        void SetHttpClientHeader(string name, string value);
        void SetHttpClientHeader(string name, IEnumerable<string> value);
        void SetHeaders(IHeaderDictionary headers);
    }
}
