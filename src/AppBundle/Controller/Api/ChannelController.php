<?php

namespace AppBundle\Controller\Api;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use AppBundle\Entity\Channel;

class ChannelController extends FOSRestController
{
    /**
     * @Rest\View()
     * @Rest\Get("/channel/list/{page}", defaults={"page": 1}, requirements={"page" = "\d+"})
     */
    public function listAction($page)
    {
        // TODO: Create a manager and support pagination for the channel list
        $repository = $this->getDoctrine()->getRepository(Channel::class);
        return $repository->findAll();
    }
}
