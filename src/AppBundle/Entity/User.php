<?php

namespace AppBundle\Entity;

use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Json;

/**
 * @ORM\Entity(repositoryClass="AppBundle\Repository\UserRepository")
 * @Json\ExclusionPolicy("all")
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     * @Json\Expose()
     */
    protected $id;

    public function __construct()
    {
        parent::__construct();
    }
}
