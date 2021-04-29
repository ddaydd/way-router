copy in packages meteor folder

`meteor add dfm:way-router`

in body add 

`{{> yield}}`

in route.js add

```
Way.route({
    path: "/profile/:userId",
    name: "profile",
    onBeforeAction() {
        import '../import/client/profile.js';
    },
    data() {
        return this.params;
    },
});
```