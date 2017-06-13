<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use AppBundle\Form\PusherXampleType;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render('default/index.html.twig', array(
            'base_dir' => realpath($this->container->getParameter('kernel.root_dir').'/..').DIRECTORY_SEPARATOR,
        ));
    }

    /**
     * @Route("/pusher", name="homepage_pusher")
     */
    public function sendMessageAction(Request $request)
    {
        $form = $this->createForm(new PusherXampleType(), []);
        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $pusher = $this->get('gos_web_socket.wamp.pusher');
            $pusher->push($form->get('message')->getData(), 'topic_xample', []);
            // Set success flash message
            $this->addFlash('success', 'Message sent successfully!');
        }
        return $this->render('default/pusher.html.twig', [
            'form' => $form->createView()
        ]);
    }
}
