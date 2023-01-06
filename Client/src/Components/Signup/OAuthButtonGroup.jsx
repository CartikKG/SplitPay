import { Button, ButtonGroup, VisuallyHidden } from '@chakra-ui/react'
import { GitHubIcon, GoogleIcon, TwitterIcon } from './ProviderIcons'
import { ChakraProvider } from '@chakra-ui/react'
const providers = [
  {
    name: 'Google',
    icon: <GoogleIcon boxSize="5" />,
  },
  {
    name: 'Twitter',
    icon: <TwitterIcon boxSize="5" />,
  },
  {
    name: 'GitHub',
    icon: <GitHubIcon boxSize="5" />,
  },
]

export const OAuthButtonGroup = () => (
  <ChakraProvider>
  <ButtonGroup variant="outline" spacing="4" width="full">
    {providers.map(({ name, icon }) => (
      <Button key={name} width="full">
        <VisuallyHidden>Sign in with {name}</VisuallyHidden>
        {icon}
      </Button>
    ))}
  </ButtonGroup>
  </ChakraProvider>
)
