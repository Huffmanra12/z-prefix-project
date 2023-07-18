/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {UserId: 1, Item_Name: 'Western Digital Hard Drive', Description: 'WD Blue internal hard drives deliver reliability for office and web applications. They are ideal for use as primary drives in desktop PCs and for office applications. With a range of capacities and cache sizes, there’s a WD Blue internal hard drive that’s just right for you.', Quantity: 20},
    {UserId: 1, Item_Name: 'Cat6 Cable', Description: 'Bulk Cat6 Cable 1000ft 23AWG Unshielded Twisted Pair CCA Conductor (Copper Clad Aluminum) for computers, routers, VoIP phones, IP cameras, printers, gaming consoles, routers, Ethernet extenders, switch boxes, PoE devices and other high-performance networking applications.', Quantity: 100},
    {UserId: 2, Item_Name: 'Panasonic Tough Book', Description: 'semi-rugged laptop designed to withstand harsh environments and tested to MIL-STD-810G standards. It has a magnesium alloy chassis, spill-resistant keyboard, and shock-mounted HDD with floating connectors. It has also passed a gravity drop resistance test of 76cm. Created for a wide range of workers in areas such as the automotive diagnostic industry and field service workers specializing in repairs and maintenance.', Quantity: 60},
    {UserId: 2, Item_Name: 'Leatherman Multitool', Description: '21 tools in 1: Includes all the essentials, from replaceable wire cutters to spring-action scissors to 2 knives for ambidextrous use; Ideal for EDC, home, work and everything else', Quantity: 43},


  ]);
};
