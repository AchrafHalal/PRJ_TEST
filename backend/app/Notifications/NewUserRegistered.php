<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;

class NewUserRegistered extends Notification
{
    use Queueable;

    protected $user;

    /**
     * Create a new notification instance.
     */
    public function __construct($user)
    {
        $this->user = $user;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via($notifiable)
    {
        return ['mail', 'database']; // Add 'database' if you want to store it
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('New User Registered')
            ->line('A new user has registered: ' . $this->user->firstName . ' ' . $this->user->lastName)
            ->action('View User', url('/admin')) // Update this URL as needed
            ->line('Thank you for managing the platform!');
    }

    /**
     * Store notification in the database.
     */
    public function toDatabase($notifiable)
    {
        return [
            'message' => 'A new user has registered: ' . $this->user->firstName . ' ' . $this->user->lastName,
            'user_id' => $this->user->id,
        ];
    }
}
