using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace WeatherFavorites.Application
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        Task<List<TEntity>> GetAll();
        Task<TEntity> GetById(string id);
        Task Create(TEntity entity);
        Task CreateRange(List<TEntity> entities);
        Task Update(TEntity entity);
        Task Update(IEnumerable<TEntity> entity);
        Task<int> SetField(Expression<Func<TEntity, bool>> predicate, Action<TEntity> action);
        Task Delete(string id);
        Task<List<TEntity>> Filter(Expression<Func<TEntity, bool>> predicate);
        Task<TEntity> FilterSingle(Expression<Func<TEntity, bool>> predicate);
        Task<int> Count(Expression<Func<TEntity, bool>> predicate);
    }
}
