copy this repository in packages meteor folder

`meteor add dfm:way-router`

in body add 

`{{> yield}}`

in route.js add

```
Way.route({
  path: "/profile/:userId",
  name: "profile",
  waitOn(){
    return Meteor.subscribe('user', this.params?.userId);
  },
  onBeforeAction() {
    import '../import/api/users/client/profile.js';
  },
  data() {
    return Users.findOne(this.params.userId);
  },
});
```