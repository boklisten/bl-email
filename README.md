# Bl-Email

## Install

```text
npm install @boklisten/bl-email
```

## Publish

```shell
npm version # Optionally --patch
npm publish
```

NB: Do not use `yarn publish`!

## Example usage

import the emailHandler

```typescript
import { EmailHandler } from "@boklisten/bl-email";
```

create a emailHandler (the _emailTemplateConfig_ will be discussed later)

```typescript
const emailHandler = new EmailHandler(emailTemplateConfig);
```

send an email

```typescript
emailHandler.send({
  userId: "user1",
  toEmail: "wizard@boklisten.com",
  fromEmail: "noreply@email.com",
  subject: "Hi there",
  emailType: "hello",
});
```

## EmailTemplateInput

The emailHandler supports different types of emails tailored for use with boklisten.no apps.

###### required inputs for all email types

```typescript
let emailTemplateInput = {
  emailType: "the email type",
  userId: "the id of the user this mail is regarding",
  toEmail: "user@email.com",
  fromEmail: "noreply@email.com",
  subject: "a subject for the email",
};
```

##### hello

Used as a welcome message when the customer registers.

###### required inputs

```typescript
let emailTemplateInput = {
  emailType: "hello",
};
```

##### generic

A generic email that can take display messages specified by the user.

###### required inputs

```typescript
let emailTemplateInput = {
  emailType: "generic",
  title: "a title for the message",
  textBlocks: [
    {
      text: "a user created message, can have as many textBlocks as the user wants",
    },
  ],
};
```

##### confirm-email

A email that is sent out for the customer to confirm his or her email address

###### required inputs

```typescript
let emailTemplateInput = {
  emailType: "confirm-email",
  confirmLink: "a https link for the user to confirm email",
};
```

##### password-reset

A email that is sent out if the customer requests a password reset

###### required inputs

```typescript
let emailTemplateInput = {
  emailType: "password-reset",
  passwordResetLink: "a https link for the user to reset his or her password",
};
```

##### receipt

A email that is sent when a order has been processed, this can for ex. be an order, some deliveries or extends.

###### required inputs

```typescript
let emailTemplateInput = {
  emailType: "receipt",
  username: "the name of the user",
  showPrice: true || false,
  showDeadline: true || false,
  numberOfCols: 3,
  items: [
    {
      title: "the title of the item",
      status: "ordered",
      deadline: "the deadline date",
      price: 100,
    },
  ],
  totalPrice: 100,
  order: {
    orderId: "id of order",
  },
};
```
