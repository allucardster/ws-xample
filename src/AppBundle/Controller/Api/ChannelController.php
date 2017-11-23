<?php

namespace AppBundle\Controller\Api;

use Symfony\Component\HttpFoundation\Request;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\ParamConverter;
use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;

class ChannelController extends FOSRestController
{
    /**
     * @Rest\View()
     * @Rest\Get("/channel/list/{page}", defaults={"page": 1}, requirements={"page" = "\d+"})
     */
    public function listAction($page)
    {
        return [
            [
                'id' => 1,
                'name' => 'General',
                'slug' => 'general'
            ],
            [
                'id' => 2,
                'name' => 'Lorem ipsum',
                'slug' => 'lorem-ipsum'
            ]
        ];
    }
}
