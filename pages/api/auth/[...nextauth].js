import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {
        let client;
        try {
          client = await connectToDatabase();
          const usersCollection = client.db().collection('users');
          const user = await usersCollection.findOne({
            email: credentials.email,
          });

          if (!user) {
            return;
            //throw new Error('No user found!');
          }

          const isValid = await verifyPassword(
            credentials.password,
            user.password
          );

          if (!isValid) {
            return ;
            //throw new Error('Could not log you in!');
          }
          console.log(user.email);
          return { email: user.email };
        } catch (error) {
          return null;
          //throw error;
        } finally {
          client.close();
        }
      }
    })
  ]
});
