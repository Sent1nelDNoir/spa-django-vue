from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.contrib.auth.base_user import AbstractBaseUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager


class User(AbstractBaseUser, PermissionsMixin):
    """
    Модель пользователя для авторизации
    """
    email = models.EmailField(_('Email'), unique=True)  # Email пользователя
    password = models.CharField(_('password'), max_length=128)  # Пароль пользователя
    first_name = models.CharField(_('Имя'), max_length=50)  # Имя пользователя
    last_name = models.CharField(_('Фамилия'), max_length=50)  # Фамилия пользователя
    api_token = models.CharField(_('Api token'), max_length=60)  # Токен авторизации
    avatar = models.CharField(_('Аватар'), max_length=255)  # Аватар пользователя
    created = models.DateTimeField(_('Дата создания'), auto_now_add=True)  # Дата добавления пользователя

    objects = UserManager()

    USERNAME_FIELD = 'email'  # Имя, которое импользуем в качестве индикатора
    REQUIRED_FIELDS = []  # Список полей при создании createsuperuser

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'
        db_table = 'users'

    @property
    def get_full_name(self):
        """
        Возвращаем полное имя пользователя
        :return: Строковое значение полного имени
        """
        return "%s %s" % (self.last_name, self.first_name)

    @property
    def get_short_name(self):
        """
        Возвращаем сокращенное имя пользователя
        :return: Строковое значение сокращенного имени
        """
        return self.first_name
