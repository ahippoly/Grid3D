import { Box, Button, Stack, Typography } from '@mui/material'
import logoLetter from '@/assets/logo_letter.png'
import logoIcon from '@/assets/logo_icon.png'
import logoIconRight from '@/assets/icon_right_side.png'
import logoIconLeft from '@/assets/left_side.png'
import cube3D from '@/assets/cube3D.png'
import spring3D from '@/assets/spring 3D.png'
import { NavLink } from 'react-router-dom'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

function HomePage () {
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true })
    tl.from('#main-logo', { delay: 1, duration: 1, opacity: 0 })
    tl.from('#left-logo', { duration: 1, opacity: 0, ease: 'bounce.in' }, '-=0.1')
    tl.from('#right-logo', { duration: 1, opacity: 0, ease: 'bounce.in' }, '<')

    tl.from('#left-logo', { duration: 1, y: 200 }, '-=0.25')
    tl.from('#right-logo', { duration: 1, y: 200 }, '<')
    tl.from('#main-logo', { duration: 1, y: 200 }, '<')

    tl.from('#big-title', { duration: 1, y: 200, opacity: 0 }, '-=0.7')
    tl.from('#sub-title', { delay: 0.1, duration: 1, y: 200, opacity: 0 }, '<')
    tl.from('#buttons-title', { delay: 0.2, duration: 1, y: 200, opacity: 0 }, '<')

    tl.from('#cube3D', { delay: 0.2, duration: 1, y: -500, ease: 'power1.out' }, '>')
    tl.from('#spring3D', { delay: 0.2, duration: 1, y: -500, ease: 'power1.out' }, '<')

    const cube3DTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    cube3DTimeline.to('#cube3D', { duration: 3, y: '+=50', ease: 'power1.inOut' }, '<')

    const spring3DTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    spring3DTimeline.to('#spring3D', { duration: 2, y: '+=50', ease: 'power1.inOut' }, '<')

    tl.add(cube3DTimeline, '>')
    tl.add(spring3DTimeline, '<')

    console.log('test')
    tl.play()
  })

  return (
    <Box
      textAlign='center'
    >
      <img
        id='cube3D'
        alt=''
        style={{
          position: 'absolute',
          left: 150,
          top: 120,
        }}
        src={cube3D}
      />
      <img
        id='spring3D'
        alt=''
        style={{
          position: 'absolute',
          right: 80,
          top: 250,
        }}
        src={spring3D}
      />
      <Box
        mt={12}
      >
        <img
          id='left-logo'
          alt=''
          src={logoIconLeft}
        />
        <img
          id='main-logo'
          alt=''
          src={logoLetter}
        />
        <img
          id='right-logo'
          alt=''
          src={logoIconRight}
        />
      </Box>

      <Typography
        id='big-title'
        maxWidth={1000}
        variant='h2'
        mx='auto'
        mt={12}
        mb={4}
      >The Ultimate NFT Ai generator that track intellectual property
      </Typography>
      <Typography
        id='sub-title'
        color='text.secondary'
        variant='h6'
        mb={15}
      >
        Earn money with your Ai arts, generate crazy NFTs and use exclusive datasets for your models right now
      </Typography>

      <Stack
        id='buttons-title'
        direction='row' gap={2} justifyContent='center'
      >
        <NavLink to='/create'><Button size='large' variant='contained'> Create NFT </Button></NavLink>
        <NavLink to='/provide'><Button size='large' variant='outlined'>Sell your Datas </Button></NavLink>
      </Stack>
    </Box>
  )
}

export default HomePage
