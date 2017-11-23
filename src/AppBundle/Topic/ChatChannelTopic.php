<?php

namespace AppBundle\Topic;

use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;
use Gos\Bundle\WebSocketBundle\Client\ClientManipulatorInterface;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use AppBundle\Entity\User;

class ChatChannelTopic implements TopicInterface
{
    protected $clientManipulator;

    public function __construct(ClientManipulatorInterface $clientManipulator)
    {
        $this->clientManipulator = $clientManipulator;
    }

    /**
     * This will receive any Subscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @return void
     */
    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        $user = $this->clientManipulator->getClient($connection);
        $username = '';
        $msgFormat = '%s is connected';
        if ($user instanceof User) {
            $username = $user->getUsername();
        } else {
            $username = $user;
        }
        //this will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast([
            'type' => 'connection',
            'username' => $username,
            'body' => sprintf($msgFormat, $username)
        ]);
    }

    /**
     * This will receive any UnSubscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @return void
     */
    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request)
    {
        $user = $this->clientManipulator->getClient($connection);
        $username = '';
        $msgFormat = '%s is disconnected';
        if ($user instanceof User) {
            $username = $user->getUsername();
        } else {
            $username = $user;
        }
        //this will broadcast the message to ALL subscribers of this topic.
        $topic->broadcast([
            'type' => 'connection',
            'username' => $username,
            'body' => sprintf($msgFormat, $username)
        ]);
    }


    /**
     * This will receive any Publish requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic $topic
     * @param WampRequest $request
     * @param $event
     * @param array $exclude
     * @param array $eligible
     * @return mixed|void
     */
    public function onPublish(ConnectionInterface $connection, Topic $topic, WampRequest $request, $event, array $exclude, array $eligible)
    {
        $user = $this->clientManipulator->getClient($connection);
        $username = '';
        if ($user instanceof User) {
            $username = $user->getUsername();
        } else {
            $username = $user;
        }
        $topic->broadcast([
            'type' => 'message',
            'username' => $username,
            'body' => $event,
        ]);
    }

    /**
    * Like RPC is will use to prefix the channel
    * @return string
    */
    public function getName()
    {
        return 'chat.channel.topic';
    }
}