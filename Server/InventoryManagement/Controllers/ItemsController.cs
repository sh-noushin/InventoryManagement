using InventoryManagement.Models;
using InventoryManagement.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        private readonly IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Item>>> GetItems()
        {
            var items = await _itemService.GetAllItemsAsync();
            return Ok(items);
        }

        [HttpGet("/Get/{id}")]
        public async Task<ActionResult<Item>> GetItem(int id)
        {
            var item = await _itemService.GetItemByIdAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost("/Add")]
        public async Task<ActionResult> CreateItem(Item item)
        {
            await _itemService.AddItemAsync(item);
            return CreatedAtAction(nameof(GetItem), new { id = item.Id }, item);
        }

        [HttpPut("/Update/{id}")]
        public async Task<ActionResult> UpdateItem(int id, string itemName)
        {
            var item = new Item { Id = id, Name = itemName };
            await _itemService.UpdateItemAsync(item);
            return NoContent();
        }

        [HttpDelete("/Delete/{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            await _itemService.DeleteItemAsync(id);
            return NoContent();
        }
    }
}
