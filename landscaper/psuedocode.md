Landscaper Game
Psuedocode


1. @ Start - Unlock teeth, make $1 per day.

2. @ $5 - Unlock rusty scissors, make *$5* per day.

3. @ $25 - Unlock Old-Timey Push Lawnmower, make *$50* per day.

4. @ $250 - Unlock fancy battery-powered lawnmower, make *100* per day.

5. @ $500 - Unlock team of starving students, make *250* per day.

WIN CONDITION - Team of starving students, $1000


Deliverables:
+ Take User Input
+ User Earns Money
+ User Buys Tools
+ User Wins Game

Hungry For More:
+ Reset Functionality
+ Multiple Tools Earns More Money
+ Sell Tools Half Price
+ Hookup To DOM

Extras:
+ Durability
+ Haggle With Merchant
+ Relationship With Merchant?
+ You're a Goat

Things I Need:

JS
  Goat Object
  Tool Class
    Rusty Scissors - Cost[5], Make[5], Durability[20],
    Old Timey Push Lawnmower - Cost[25], Make[50], Durability[10]
    Fancy Battery Powered Lawnmower - Cost[250], Make[100], Durability[5]
    Team of Starving Students - Cost[500], Make[250], Durability[3]

HTML
  Space to Purchase Tools / Merchant State
    Text Box
    Text Input Box
    Stats Box
      Wallet
      Current Tools
      Tool Durability


FlexBox -
  -You start with 4 squares ( 2 rows 2 columns flexbox )
  -You can click on each of them, and when you do, you basically 'mow the lawn'.
  -That square becomes inactive for a certain number of turns
  -increase squares based on renown level


TODO:
Add separate tools to separate Lawns
  add image of tool to the top of the lawn
Make the lawns auto regen instead of doing it by advancing the DAY
