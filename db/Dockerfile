FROM mysql:5.6

ENV MYSQL_ROOT_PASSWORD root

COPY my.cnf /etc/mysql/my.cnf
COPY localdb-run.sh /
RUN chmod +x /localdb-run.sh

ENTRYPOINT ["/localdb-run.sh"]


