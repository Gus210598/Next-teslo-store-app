import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import Credentials from 'next-auth/providers/credentials';

import { dbUser } from '../../../database';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here

    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder:'correo@dominio.com' },
        password  : { label: 'Contraseña:', type: 'password', placeholder:'Contraseña' },
      },
      async authorize(credentials):Promise<any>  {
        // console.log({credentials})
        // TODO: validar contra base de datos
        // return null;
        // return { name:'Gus', correo :'gus@gmail.com', role: 'admin'};
        return await dbUser.checkUserEmailPassword( credentials!.email, credentials!.password );
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),


  ],

  // Custom Pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },

  // Callbacks
  jwt: {
    // secret: process.env.JWT_SECRET_SEED, // deprecated
  },
  
  session: {
    maxAge: 2592000, // 30 días
    strategy: 'jwt',
    updateAge: 86400, // Cada día se va actualizar
  },


  callbacks: {
    async jwt({ token, account, user }) {

      // console.log('Aer JWT ', { token, account, user} )
      if ( account ) {
        token.accessToken = account.access_token;

        switch( account.type ) {
          case 'oauth':
            // Crear usuario o verificar si existe
            token.user = await dbUser.oAuthToDbUser( user?.email || '', user?.name || '' )
            break;
          case 'credentials':
            token.user = user;
            break;
        }
      }

      return token;
    },


    async session({ session, token, user }) {
      // console.log('Aer Session ', session.accessToken )

      // session.accessToken = token.accessToken;
      session.user = token.user as any;
      return session;

    }
    

  }

});