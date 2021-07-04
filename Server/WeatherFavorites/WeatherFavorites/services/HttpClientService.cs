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
    public class HttpClientService: IHttpClientService
    {
        private readonly HttpClient _httpClient;
        public HttpClientService(HttpClient httpClient)
        {
            _httpClient = httpClient;

            _httpClient.DefaultRequestHeaders.Accept.Clear();

            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public void SetHttpClientHeader(string name, string value)
        {
           // _httpClient.DefaultRequestHeaders.Clear();

            _httpClient.DefaultRequestHeaders.Add(name,value);
        }
        public void SetHttpClientHeader(string name, IEnumerable<string> value)
        {
            //_httpClient.DefaultRequestHeaders.Clear();

            _httpClient.DefaultRequestHeaders.Add(name,value);
        }
        public async virtual Task<T> Get<T>(string baseAddress, string apiRelativeUrl, string parm = null)
        {
            T resJson = default(T);

            try
            {
                HttpClient cons = CreateHttpClient(baseAddress);

                string paramString = parm != null ? "/" + parm : string.Empty;


                HttpResponseMessage res = await cons.GetAsync(apiRelativeUrl + paramString);

                res.EnsureSuccessStatusCode();

                if (res.IsSuccessStatusCode)
                {


                    var resData = await res.Content.ReadAsStringAsync();
                    resJson = JsonConvert.DeserializeObject<T>(resData);
                }

            }
            catch (HttpRequestException ex)
            {
                //LogManager.LogError(MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, ex, ex.Message);

            }
            return resJson;
        }

        public void SetHeaders(IHeaderDictionary headers)
        {
            if (headers != null)
            {
                foreach (var header in headers)
                {
                    SetHttpClientHeader(header.Key, header.Value.ToString());
                }
            }
        }

        public  async virtual Task<T> Get<T>(string baseAddress, string apiRelativeUrl, Dictionary<string, string> parms)
        {
            T resJson = default(T);

            try
            {
                HttpClient cons = CreateHttpClient(baseAddress);

                string paramsString = string.Empty;

                if (parms != null)
                {
                    paramsString = "?";

                    foreach (KeyValuePair<string, string> param in parms)
                    {
                        paramsString += param.Key + "=" + param.Value + "&";
                    }
                    paramsString.Remove(paramsString.Length - 1);//remove the last &
                }

                HttpResponseMessage res = await cons.GetAsync(apiRelativeUrl + paramsString);

                res.EnsureSuccessStatusCode();

                if (res.IsSuccessStatusCode)
                {

                    var resData = await res.Content.ReadAsStringAsync();
                    resJson = JsonConvert.DeserializeObject<T>(resData);
                }
            }
            catch (HttpRequestException ex)
            {
                //LogManager.LogError(MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, ex, ex.Message);

            }
            return resJson;
        }

        public  async virtual Task<T> Post<T>(string baseAddress, string apiRelativeUrl, object data, string parm = null)
        {
            T resJson = default(T);

            try
            {
                HttpClient cons = CreateHttpClient(baseAddress);

                string paramString = parm != null ? "/" + parm : string.Empty;

                HttpRequestMessage request = new HttpRequestMessage(HttpMethod.Post, baseAddress);
                request.Content = new StringContent(JsonConvert.SerializeObject(data),
                                                    Encoding.UTF8,
                                                    "application/json");//CONTENT-TYPE header

                HttpResponseMessage res = await cons.PostAsync(apiRelativeUrl + paramString, request.Content);

                res.EnsureSuccessStatusCode();

                if (res.IsSuccessStatusCode)
                {

                    var resData = await res.Content.ReadAsStringAsync();
                    resJson = JsonConvert.DeserializeObject<T>(resData);
                }
            }

            catch (HttpRequestException ex)
            {
                //LogManager.LogError(MethodBase.GetCurrentMethod().DeclaringType.ToString(), MethodBase.GetCurrentMethod().Name, ex, ex.Message);

            }
            return resJson;
        }

        private HttpClient CreateHttpClient(string baseAddress)
        {
            if (_httpClient.BaseAddress == null)
            {
                _httpClient.BaseAddress = new Uri(baseAddress);
            }
            return _httpClient;
        }
       
    }
}
