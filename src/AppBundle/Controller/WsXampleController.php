<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Form\PusherXampleType;

class WsXampleController extends Controller
{
    /**
     * @Route("/ws-xample", name="ws_xample_index")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('ws_xample/index.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/ws-xample/pusher", name="ws_xample_pusher")
     */
    public function pusherAction(Request $request)
    {
        $form = $this->createForm(PusherXampleType::class, []);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $pusher = $this->get('gos_web_socket.wamp.pusher');
            $pusher->push($form->get('message')->getData(), 'topic_xample', []);
            // Set success flash message
            $this->addFlash('success', 'Message sent successfully!');
        }
        return $this->render('ws_xample/pusher.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
