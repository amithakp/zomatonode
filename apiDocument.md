Page1(Home Page)
> List Of City (https://zomattoo.herokuapp.com/location)
(this will return all the city) >>>>>>>>>>>>>>>>>>Done

> Restaurant wrt to city(https://zomattoo.herokuapp.com/restaurants?city=1)
(on the basis city return restaurants) >>>>>>>>>>>>>>>>>>Done

> List of all meal (https://zomattoo.herokuapp.com/mealType)
(return all the meal types) >>>>>>>>>>>>>>>>>>Done

Page2(Listing Page)
> Find Restaurant on the basis mealType  >>>>>>>>>>>>>>>>>>Done
(this will return all the restaurant of particular meal)
(https://zomattoo.herokuapp.com/filter/mealId)

> Filter
>> Cuisine Filter >>>>>>>>>>>>>>>>>>Done
(Search on basis of mealtype and cuisine)(https://zomattoo.herokuapp.com/filter/1?cuisine=3)

>> cost Filter(https://zomattoo.herokuapp.com/filter/1?lcost=650&hcost=850)
(Search on basis of mealtype and cost)

>> sort filter(https://zomattoo.herokuapp.com/filter/1?lcost=500&hcost=2000&sortKey=-1)
(Price high to low and Low to High)

>> Cuisine + Cost(https://zomattoo.herokuapp.com/filter/1?lcost=500&hcost=1000&cuisine=2)
((Search on basis of mealtype and cuisine + cost)

Page3(Details Page)
> Get the details of restaurant on basis of Id
(https://zomattoo.herokuapp.com/restaurant/12)  >>>>>>>>>>>>>>>>>>Done

> Menu wrt to restaurant (https://zomattoo.herokuapp.com/menu/5)
(return all items of menu for particular restaurant)

Page4(Summary Page)
> Menu wrt to all ids (post)> (https://zomattoo.herokuapp.com/menuItem)
(provides item in basis of id)

> Post the order
(Insert order details in db)
(https://zomattoo.herokuapp.com/placeOrder)

/// update order with payment details
(https://zomattoo.herokuapp.com/updateStatus/1)
{
	"status":"Delivered",
	"date":"2021-08-19%2021:32:37.0",
	"bank_status":"TXN_SUCCESS",
	"bank":"Bharat%20Bank"
}
           


/// delete orders
(https://zomattoo.herokuapp.com/deleteOrder)

Page5(Order Page)
> List all the order placed >>>>>>>>>>>>>>>>>>Done
(https://zomattoo.herokuapp.com/orders)