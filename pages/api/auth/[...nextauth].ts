import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { dbUser } from "@/database";
import { signIn } from 'next-auth/react';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder:'correo@dominio.com' },
        password  : { label: 'Contraseña:', type: 'password', placeholder:'Contraseña' },
      },
      async authorize(credentials) {
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

  session: {
    maxAge: 2592000, // 30 días
    strategy: 'jwt',
    updateAge: 86400, // Cada día se va actualizar
  },



  // Custom pages
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/register',
  },


  // Callbacks
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
        // console.log('Aer Session ',{ session, token, user })

        session.accessToken = token.accessToken;
        session.user = token.user as any;
        return session;

      }
  }
}

export default NextAuth(authOptions)

