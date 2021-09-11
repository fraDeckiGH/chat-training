// @ts-nocheck
import Gun from "gun"

const gun = Gun({
  file: "gen/gundb"
  // peers: [
  //   "https://gundb-peer.herokuapp.com/gun",
  // ],
})

const alice = gun.get('alice').put({fancyName: 'alice', age: 22})
const bob = gun.get('bob').put({name: 'bob', age: 24})
const dave = gun.get('dave').put({name: 'dave'})
const carl = gun.get('carl').put({namee: 'carl', age: 3})


const company = gun.get('startup').put({
  name: "hype",
  profitable: false,
  address: {
    street: "123 Hipster Lane",
    city: "San Francisco",
    state: "CA",
    country: "USA"
  }
})

const employees = company.get('employees')
employees.set(dave)
employees.set(alice)
employees.set(bob)

alice.get('spouse').put(bob)
bob.get('spouse').put(alice)

alice.get('spouse').get('employer').put(company)
alice.get('employer').put(company)

dave.get('kids').set(carl)
carl.get('dad').put(dave)

carl.get('friends').set(alice)
carl.get('friends').set(bob)

gun
  .get('alice')
  .get('spouse')
  .get('employer')
  .get('employees')
  .map()
  .get('name')
  .once(function(data, key) {
  console.log("employee", key, data)
})







