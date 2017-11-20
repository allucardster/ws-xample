<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        return $this->redirectToRoute('chat');
    }

    /**
     * @Route("/chat", name="chat")
     * @Route("/chat/{all}", name="chat-all", requirements={"all": ".+"})
     */
    public function chatAction(Request $request)
    {
        return $this->render('default/chat.html.twig', []);
    }
}
