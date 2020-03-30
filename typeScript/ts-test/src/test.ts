enum Sports {
    soccer = 1,
    basketball,
    baseball
}
const value1: Sports = Sports.soccer;
const value2: Sports.basketball | Sports.baseball = 2;

console.log(Sports.soccer);
console.log(Sports[1]);