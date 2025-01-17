import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = account.providerAccountId; // Discord-specific ID
        token.username = profile.username;
        token.avatar = profile.avatar;
        token.email = profile.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.username = token.username;
      session.user.avatar = token.avatar;
      session.user.email = token.email;
      return session;
    },
    async signIn({ account, profile }) {
      try {
        // Call the /create-user API route to update the database
        await fetch(`${process.env.NEXTAUTH_URL}/api/firebase/create-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: account.providerAccountId,
            username: profile.username,
            avatar: profile.avatar,
            email: profile.email,
          }),
        });
        return true; // Proceed with login
      } catch (error) {
        console.error("Error updating user in database:", error);
        return false; // Reject login if the database update fails
      }
    },
  },
});

export { handler as GET, handler as POST };