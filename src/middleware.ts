export { default } from "next-auth/middleware";

// This config contains an array that restricts the user visit these two pages without signing in 
export const config = {
    matcher : ["/cart", "/success"],
}
