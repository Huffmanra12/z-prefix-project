/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('item').del()
  await knex('item').insert([
    {userid: 1, item_name: 'Western Digital Hard Drive', description: 'WD Blue internal hard drives deliver reliability for office and web applications. They are ideal for use as primary drives in desktop PCs and for office applications. With a range of capacities and cache sizes, there’s a WD Blue internal hard drive that’s just right for you.', quantity: 20},
    {userid: 1, item_name: 'Cat6 Cable', description: 'Bulk Cat6 Cable 1000ft 23AWG Unshielded Twisted Pair CCA Conductor (Copper Clad Aluminum) for computers, routers, VoIP phones, IP cameras, printers, gaming consoles, routers, Ethernet extenders, switch boxes, PoE devices and other high-performance networking applications.', quantity: 100},
    {userid: 2, item_name: 'Panasonic Tough Book', description: 'semi-rugged laptop designed to withstand harsh environments and tested to MIL-STD-810G standards. It has a magnesium alloy chassis, spill-resistant keyboard, and shock-mounted HDD with floating connectors. It has also passed a gravity drop resistance test of 76cm. Created for a wide range of workers in areas such as the automotive diagnostic industry and field service workers specializing in repairs and maintenance.', quantity: 60},
    {userid: 2, item_name: 'Leatherman Multitool', description: '21 tools in 1: Includes all the essentials, from replaceable wire cutters to spring-action scissors to 2 knives for ambidextrous use; Ideal for EDC, home, work and everything else', quantity: 43},


  ]);
};
