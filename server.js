
import express from 'express'
import engine from 'ejs-mate'
import flash from 'connect-flash'
import session from 'express-session'
import passport from 'passport'
import path from 'path'
import sessionRouter from './routers/users.js'
import productosApiRouter from './routers/productos.js'
import carritosApiRouter from './routers/carritos.js'
import { connect } from './connect.js'
import { graphqlHTTP } from 'express-graphql'
import schema from './graphql/schema.js'

//Importamos la estrategia local
import ('./passport/local-auth.js')

//Conexion Mongo
connect();

//Instancia servidor y API
const app = express()

//Configuracion servidor
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('views/public'));

// settings
app.set('port', process.env.PORT || process.env.DEV_PORT);
app.set('views',path.join(process.cwd(),'/views'))
app.engine('ejs', engine);
app.set('view engine', 'ejs');

// middlewares
app.use(session({
  secret: 'mysecretsession',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30000
}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  app.locals.signinMessage = req.flash('signinMessage');
  app.locals.signupMessage = req.flash('signupMessage');
  app.locals.user = req.user;
  //console.log(app.locals)
  next();
});

//graphql
app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema: schema
}));

//rutas del servidor API Rest
app.use('/api/productos', productosApiRouter)
app.use('/api/carritos', carritosApiRouter)
app.use('/', sessionRouter);


const server = app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});
server.on('error', error => console.log(`Error en servidor: ${error}`))

export default app
