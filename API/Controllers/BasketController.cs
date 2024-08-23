using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _storeContext;
        public BasketController(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }


        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await GetBasketAsync();

            if (basket == null)
                return NotFound();

            return MapBasketToDto(basket);
        }

        [HttpPost]
        public async Task<ActionResult> AddBasketItem(int productId, int quantity)
        {

            var basket = await GetBasketAsync();
            if (basket == null)
                basket = CreateBasket();

            var product = await GetProductAsync(productId);

            if (product == null)
                return NotFound("Product Not Found");

            basket.AddItem(product, quantity);

            var result = await _storeContext.SaveChangesAsync() > 0;

            if (result)
                return CreatedAtRoute("GetBasket", MapBasketToDto(basket));

            return BadRequest(new ProblemDetails { Title = "Problem occured adding item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteBasketItem(int productId, int quantity)
        {
            var basket = await GetBasketAsync();
            basket.RemoveItem(productId, quantity);
            var result = await _storeContext.SaveChangesAsync() > 0;
            if (result)
                return Ok();

            return BadRequest(new ProblemDetails() { Title = "Problem removing item from the basket" });
        }


        private async Task<Basket> GetBasketAsync()
        {
            var basket = await _storeContext.Baskets
            .Include(basket => basket.Items)
            .ThenInclude(item => item.Product)
            .FirstOrDefaultAsync(basket => basket.BuyerId == Request.Cookies["buyerId"]);

            return (basket == null) ? null : basket;
        }

        private async Task<Product> GetProductAsync(int productId)
        {
            var product = await _storeContext.Products
            .FirstOrDefaultAsync(product => product.Id == productId);

            return (product == null) ? null : product;

        }

        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);

            var basket = new Basket()
            {
                BuyerId = buyerId
            };
            _storeContext.Baskets.Add(basket);
            return basket;
        }

        private BasketDto MapBasketToDto(Basket basket)
        {
            return new BasketDto()
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(item =>
                {
                    return new BasketItemDto()
                    {
                        ProductId = item.ProductId,
                        Name = item.Product.Name,
                        Brand = item.Product.Brand,
                        Description = item.Product.Description,
                        PictureUrl = item.Product.PictureUrl,
                        Price = item.Product.Price,
                        Type = item.Product.Type,
                        Quantity = item.Quantity,
                    };
                }).ToList()
            };
        }
    }
}