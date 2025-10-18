export const maskEmail = (email) => {
  if (!email || email.indexOf('@') === -1) {
    return email;
  }

  const [localPart, domainPart] = email.split('@');

  if (localPart.length <= 2) {
    return `${localPart.charAt(0)}*****@${domainPart}`;
  }

  const maskedLocalPart = localPart.substring(0, 2) + '*****';

  return `${maskedLocalPart}@${domainPart}`;
};
